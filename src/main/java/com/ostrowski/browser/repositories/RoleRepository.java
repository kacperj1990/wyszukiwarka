/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.repositories;

import com.ostrowski.browser.model.Role;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Kacper
 */
public interface RoleRepository extends MongoRepository<Role, ObjectId>{
    
}
