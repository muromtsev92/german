package com.german.app.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "verbs")
public class Verb extends Word {
    @Column(nullable = false)
    private String prateritum;

    @Column(nullable = false)
    private String partizipZwei;
}

