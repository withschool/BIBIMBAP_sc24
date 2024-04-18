package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user")
@Builder
@AllArgsConstructor
public class User extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "id", unique = true, nullable = false)
    private String id;

    @Setter
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sex", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean sex;

    @Column(name = "phone_number", unique = true, nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "birth_date", nullable = false)
    private LocalDateTime birthDate;

    @Column(name = "account_type", nullable = false)
    private int accountType;

    @Column(name = "user_code", unique = true, nullable = false)
    private String userCode;

    @Column(name = "parent_code", unique = true)
    private String parentCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private SchoolInformation schoolInformation;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String auth = "ROLE_";
        if (this.accountType == 0) auth += "STUDENT";
        else if (this.accountType == 1) auth += "PARENT";
        else if (this.accountType == 2) auth += "TEACHER";
        else if (this.accountType == 3) auth += "ADMIN";
        else if (this.accountType == 4) auth += "SUPER";

        return Collections.singletonList(new SimpleGrantedAuthority(auth));
    }

    @Override
    public String getUsername() {
        return this.getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void changeUserInfo(String id, String password, String email, String phoneNumber, String address) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
