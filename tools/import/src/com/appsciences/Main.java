package com.appsciences;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import com.appsciences.dto.Doctor;
import com.appsciences.dto.Location;
import com.appsciences.dto.Pointer;
import com.appsciences.dto.Response;
import com.google.gson.Gson;

public class Main {
	
	public static String URL = "https://api.parse.com/1/classes/";
	public static String PARSE_REST_API_KEY = "";
	public static String PARSE_APPLICATION_ID = "";
	
	public static String sendPut(String className, String objectId, String jsonData) throws Exception {
		
		URL obj = new URL(URL + className + "/" + objectId);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
 
		con.setRequestMethod("PUT");
		con.setRequestProperty("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
		con.setRequestProperty("X-Parse-Application-Id", PARSE_APPLICATION_ID);
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Content-length", String.valueOf(jsonData.length()));
 		con.setDoOutput(true);
        
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(jsonData);
		wr.flush();
		wr.close();
		
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'PUT' request to URL : " + URL + className);
		System.out.println("Post parameters : " + jsonData);
		System.out.println("Response Code : " + responseCode);
 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		Gson gson = new Gson();
		Response resp = gson.fromJson(response.toString(), Response.class);
		
		return resp.getObjectId();
	}
	
	public static String sendPost(String className, String jsonData) throws Exception {
		URL obj = new URL(URL + className);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
 
		con.setRequestMethod("POST");
		con.setRequestProperty("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
		con.setRequestProperty("X-Parse-Application-Id", PARSE_APPLICATION_ID);
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Content-length", String.valueOf(jsonData.length()));
 		con.setDoOutput(true);
 		
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(jsonData);
		wr.flush();
		wr.close();
 
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + URL + className);
		System.out.println("Post parameters : " + jsonData);
		System.out.println("Response Code : " + responseCode);
 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		Gson gson = new Gson();
 
		Response resp = gson.fromJson(response.toString(), Response.class);
		
		return resp.getObjectId();
	}
	
	public static String capitalize(String input) {
		if(input == null)
			return input;
		if(input.equals(""))
			return input;
		
		return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
	}

	public static void main(String[] args) {
		
		if(args.length != 2 || args[0] == null || args[1] == null) {
			System.out.println("Please specify the doctors CSV and location CSV files path");
			System.exit(-1);
		}
		
		List<Doctor> doctorList = new ArrayList<Doctor>();
		List<Location> locationList = new ArrayList<Location>();
		
		Gson gson = new Gson();
		 
		Reader doctorIn = null;
		Reader locationIn = null;
		
		try {
			doctorIn = new FileReader(args[0]);
			locationIn = new FileReader(args[1]);
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		Iterable<CSVRecord> doctorRecords = null;
		Iterable<CSVRecord> locationRecords = null;
		
		try {
			doctorRecords = CSVFormat.DEFAULT.parse(doctorIn);
			locationRecords = CSVFormat.DEFAULT.parse(locationIn);
		} catch (IOException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		for (CSVRecord record : doctorRecords) {
		    
			Doctor doctor = new Doctor();
			
			String name[] = record.get(1).split(", ");

			if(name[0] != null)
				doctor.setLastName(capitalize(name[0]));
			
			if(name.length == 2)
				doctor.setFirstName(capitalize(name[1]));
			
			doctor.setPracticeLocation(record.get(2));
			doctor.setSecondLocation(record.get(3));
			doctor.setThirdLocation(record.get(4));
			doctor.setFourthLocation(record.get(5));
			doctor.setFieldOfMedicine(record.get(6));
			
			doctorList.add(doctor);
		}
		
		for (CSVRecord record : locationRecords) {
			
			Location location = new Location();
			
			String name[] = record.get(0).split(", ");

			if(name[0] != null)
				location.setLastName(name[0]);
			
			if(name.length == 2)
				location.setFirstName(name[1]);
			
			location.setZipCode(record.get(1));
			location.setPhone(record.get(2));
			location.setFax(record.get(3));
			location.setStreet(record.get(4));
			location.setCity(record.get(5));
			
			locationList.add(location);
		}
		
		for(Doctor doctor : doctorList) {
			String doctorId = null;
			List<String> doctorLocationsId = new ArrayList<String>();
			
			try {
				//doctorId = sendPost("Doctor", gson.toJson(doctor));
			} catch (Exception e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
			
			for(Location location : locationList) {
				if(location.getFirstName().equals(doctor.getFirstName()) && location.getLastName().equals(doctor.getLastName()) ) {
					
					String locationId = null;
					
					Pointer pointer1 = new Pointer();
					pointer1.setObjectId(doctorId);
					pointer1.set__type("Pointer");
					pointer1.setClassName("Doctor");

					location.setDoctor(pointer1);
					
					location.setFirstName(null);
					location.setLastName(null);
					
					try {
						locationId = sendPost("Location", gson.toJson(location));
					} catch (Exception e) {
						System.out.println(e.getMessage());
						e.printStackTrace();
					}
					
					doctorLocationsId.add(locationId);
				}
			}
			
			for(String locationId : doctorLocationsId) {
				
				Pointer pointer2 = new Pointer();
				pointer2.set__type("Pointer");
				pointer2.setClassName("Location");
				pointer2.setObjectId(locationId);
				
				doctor.getLocations().add(pointer2);
			}
			
			try {
				String jsonDoctor = gson.toJson(doctor);
				sendPut("Doctor", doctorId, jsonDoctor);
			} catch (Exception e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
		}
	}
}
