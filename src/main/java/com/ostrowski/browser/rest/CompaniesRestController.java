package com.ostrowski.browser.rest;

import com.ostrowski.browser.model.Company;
import com.ostrowski.browser.repositories.CompanyRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ScriptOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Kacper
 */
@org.springframework.web.bind.annotation.RestController
@Component
public class CompaniesRestController {

    @Autowired
    private CompanyRepository repository;

    @Autowired
    MongoTemplate mongoTemplate;

    
    @RequestMapping(value = "/addCompany", method = RequestMethod.POST, consumes = "application/json")
    public void addCompany(@RequestBody Company company) {
        if (company != null) {
            repository.save(company);
        }
    }

    
    @RequestMapping(value = "/companies", method = RequestMethod.GET)
    public Object getCompanies() {
        return repository.findAll();
    }

    
    @RequestMapping(value = "/companiesSearch/{search}", method = RequestMethod.GET)
    public List<Company> searchComapny(@PathVariable("search") String search) {
        Object obj = null;
        ScriptOperations scriptOps = mongoTemplate.scriptOps();
        if (scriptOps.exists("searchQuery")) {
            obj = scriptOps.call("searchQuery", search);
        }
        return (List<Company>) obj;
    }

    
    @RequestMapping(value = "/companiesCategory/{category}", method = RequestMethod.GET)
    public Object getCategoryCompanies(@PathVariable("category") String category) {
        Object obj = null;
        ScriptOperations scriptOps = mongoTemplate.scriptOps();
        if (scriptOps.exists("searchByCategory")) {
            obj = scriptOps.call("searchByCategory", category);
        }
        return (List<Company>) obj;
    }
}
