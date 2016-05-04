package com.ostrowski.browser.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetails;
import org.bson.types.ObjectId;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * Created by stephan on 20.03.16.
 */
public class JwtUser implements UserDetails {

    private final ObjectId id;
    private final String username;
    private final String firstname;
    private final String lastname;
    private final String password;
    private final List<SimpleGrantedAuthority> authorities;
//    private final boolean enabled;
//    private final Date lastPasswordResetDate;

    public JwtUser(ObjectId id, String username, String firstname, String lastname, String password, List<SimpleGrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.authorities = authorities;
//        this.enabled = enabled;
//        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    @JsonIgnore
    public String getFirstname() {
        return firstname;
    }

    @JsonIgnore
    public String getLastname() {
        return lastname;
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

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
//
//    @JsonIgnore
//    public Date getLastPasswordResetDate() {
//        return lastPasswordResetDate;
//    }

    @JsonIgnore
    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return this.authorities;
    }
}
