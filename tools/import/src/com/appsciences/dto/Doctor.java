package com.appsciences.dto;

import java.util.ArrayList;
import java.util.List;

public class Doctor {
	
	private String id;
	private boolean active;
	private String firstName;
	private String lastName;
	private String practiceLocation;
	private String secondLocation;
	private String thirdLocation;
	private String fourthLocation;
	private String fieldOfMedicine;
	private String type;
	private List<Pointer> locations;
	
	public Doctor() {
		active = true;
		type = "referring";
		locations = new ArrayList<Pointer>();		
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPracticeLocation() {
		return practiceLocation;
	}
	public void setPracticeLocation(String practiceLocation) {
		this.practiceLocation = practiceLocation;
	}
	public String getSecondLocation() {
		return secondLocation;
	}
	public void setSecondLocation(String secondLocation) {
		this.secondLocation = secondLocation;
	}
	public String getThirdLocation() {
		return thirdLocation;
	}
	public void setThirdLocation(String thirdLocation) {
		this.thirdLocation = thirdLocation;
	}
	public String getFourthLocation() {
		return fourthLocation;
	}
	public void setFourthLocation(String fourthLocation) {
		this.fourthLocation = fourthLocation;
	}
	public String getFieldOfMedicine() {
		return fieldOfMedicine;
	}
	public void setFieldOfMedicine(String fieldOfMedicine) {
		this.fieldOfMedicine = fieldOfMedicine;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public List<Pointer> getLocations() {
		return locations;
	}
	public void setLocations(List<Pointer> locations) {
		this.locations = locations;
	}
	
}
