/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ScriptOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Kacper
 */
@org.springframework.web.bind.annotation.RestController
@Component
public class CategoriesRestController {

    @Autowired
    MongoTemplate mongoTemplate;
    
    @Cacheable("categorytree")
    @RequestMapping(value = "/categoriesTree", method = RequestMethod.GET)
    public Object categoriesTree() {
        Object obj = null;
        ScriptOperations scriptOps = mongoTemplate.scriptOps();
        if (scriptOps.exists("getCategoriesTree")) {
            obj = scriptOps.call("getCategoriesTree", (Object[]) null);
        }
        return obj;
    }
}