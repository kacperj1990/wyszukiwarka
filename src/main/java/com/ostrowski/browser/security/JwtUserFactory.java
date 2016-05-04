package com.ostrowski.browser.security;

import com.ostrowski.browser.model.User;
import java.util.LinkedList;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public final class JwtUserFactory {

    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getPassword(),
                getAuthorities(user.getRole())
        );
    }
    private static List<SimpleGrantedAuthority> getAuthorities(String role) {
        SimpleGrantedAuthority sga = new SimpleGrantedAuthority(role);
        LinkedList<SimpleGrantedAuthority> ll = new LinkedList();
        ll.add(sga);
        return ll;
    }
}
