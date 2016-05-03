package com.ostrowski.browser.repositories;

import com.ostrowski.browser.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Kacper
 */
@RepositoryRestResource(collectionResourceRel = "companies", path = "companies")
public interface CompanyRepository  extends MongoRepository<Company, String>{
    
}