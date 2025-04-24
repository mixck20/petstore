package com.deloria.pet;

import jakarta.persistence.*;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String species;
    private String breed;
    private String gender;
    private String image;
    private String description;
    private Double price;

    public Pet() {}

    public Pet(String name, String species, String breed, String gender, String image, String description, Double price) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.gender = gender;
        this.image = image;
        this.description = description;
        this.price = price;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getSpecies() { return species; }
    public String getBreed() { return breed; }
    public String getGender() { return gender; }
    public String getImage() { return image; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }

    public void setId(Integer id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSpecies(String species) { this.species = species; }
    public void setBreed(String breed) { this.breed = breed; }
    public void setGender(String gender) { this.gender = gender; }
    public void setImage(String image) { this.image = image; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(Double price) { this.price = price; }
}
