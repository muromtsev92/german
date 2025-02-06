package com.example.backend.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Verb extends Word {
    private String prateritum;
    private String partizipZwei;
}
