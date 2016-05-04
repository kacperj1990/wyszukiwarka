package com.ostrowski.browser.security.service;

import com.ostrowski.browser.model.User;
import com.ostrowski.browser.security.JwtUserFactory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by stephan on 20.03.16.
 */
@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        List<User> users = mongoTemplate.find(query, User.class);
        
        if (users == null || users.size() != 1) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return JwtUserFactory.create(users.get(0));
        }
    }
}
