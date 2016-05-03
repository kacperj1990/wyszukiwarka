/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Kacper
 */
@Document(collection = "companies")
public class Company {

    @Id
    private String id;

    private String companyName;
    private String krs;
    private String regon;
    private ContactPerson contactPerson;
    private List<String> categories;
    private List<String> allowedRoles;

    public Company(String id, String companyName, String krs, String regon, ContactPerson contactPerson, List<String> categories, List<String> allowedRoles) {
        this.id = id;
        this.companyName = companyName;
        this.krs = krs;
        this.regon = regon;
        this.contactPerson = contactPerson;
        this.categories = categories;
        this.allowedRoles = allowedRoles;
    }

    private Company() {
    }

    public String getId() {
        return id;
    }

    public List<String> getAllowedRoles() {
        return allowedRoles;
    }

    public void setAllowedRoles(List<String> allowedRoles) {
        this.allowedRoles = allowedRoles;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getKrs() {
        return krs;
    }

    public void setKrs(String krs) {
        this.krs = krs;
    }

    public String getRegon() {
        return regon;
    }

    public void setRegon(String regon) {
        this.regon = regon;
    }

    public ContactPerson getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(ContactPerson contactPerson) {
        this.contactPerson = contactPerson;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
