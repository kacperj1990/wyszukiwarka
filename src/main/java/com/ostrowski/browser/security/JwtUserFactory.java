package com.ostrowski.browser.security;

import com.ostrowski.browser.model.User;
import java.util.LinkedList;
import org.springframework.security.core.GrantedAuthority;


public final class JwtUserFactory {

    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
//                user.getFirstname(),
//                user.getLastname(),
                user.getPassword(),
                //mapToGrantedAuthorities(user.getAuthorities()),
                new LinkedList<GrantedAuthority>()
                //,
//                user.getEnabled(),
//                user.getLastPasswordResetDate()
        );
    }

//    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Authority> authorities) {
//        return authorities.stream()
//                .map(authority -> new SimpleGrantedAuthority(authority.getName().name()))
//                .collect(Collectors.toList());
//    }
}
