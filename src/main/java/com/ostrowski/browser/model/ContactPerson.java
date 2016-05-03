package com.ostrowski.browser.model;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Kacper
 */
@Document
public class ContactPerson {
    
    private String name;
    private String surname;
    private String email;
    private String contactPhone;
    private String position;

    public ContactPerson (){}
    
    public ContactPerson(String name, String surname, String email, String contactPhone, String position) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.contactPhone = contactPhone;
        this.position = position;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }   
}
