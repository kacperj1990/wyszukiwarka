package com.ostrowski.browser.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import org.bson.types.ObjectId;

/**
 * Created by stephan on 20.03.16.
 */
public class JwtUser implements UserDetails {

    private final ObjectId id;
    private final String username;
//    private final String firstname;
//    private final String lastname;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;
//    private final boolean enabled;
//    private final Date lastPasswordResetDate;

//    public JwtUser(Long id, String username, String firstname, String lastname, String password, Collection<? extends GrantedAuthority> authorities, boolean enabled, Date lastPasswordResetDate) {
//        this.id = id;
//        this.username = username;
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.password = password;
//        this.authorities = authorities;
//        this.enabled = enabled;
//        this.lastPasswordResetDate = lastPasswordResetDate;
//    }

    public JwtUser(ObjectId id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    
    @JsonIgnore
    public ObjectId getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

//    public String getFirstname() {
//        return firstname;
//    }
//
//    public String getLastname() {
//        return lastname;
//    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
//
//    @JsonIgnore
//    public Date getLastPasswordResetDate() {
//        return lastPasswordResetDate;
//    }
}
