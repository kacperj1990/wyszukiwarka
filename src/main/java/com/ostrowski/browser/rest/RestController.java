package com.ostrowski.browser.rest;

import com.ostrowski.browser.model.Company;
import com.ostrowski.browser.repositories.CategoryRepository;
import com.ostrowski.browser.repositories.CompanyRepository;
import com.ostrowski.browser.repositories.RoleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ScriptOperations;
import org.springframework.http.ResponseEntity;
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
public class RestController {

    @Autowired
    MongoOperations mongoOperations;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    private RoleRepository roleRepository;


    
    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }
}