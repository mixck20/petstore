package com.deloria.pet;

import org.springframework.data.repository.CrudRepository;

public interface PetRepository extends CrudRepository<Pet, Integer> {
    Iterable<Pet> findByNameContainingOrSpeciesContainingOrBreedContainingOrGenderContainingOrDescriptionContaining(
            String name, String species, String breed, String gender, String description);

    Iterable<Pet> findByPriceLessThanEqual(Double price);
}
