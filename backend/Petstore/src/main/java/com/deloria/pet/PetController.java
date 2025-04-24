package com.deloria.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Controller
@RequestMapping(path = "/deloria/pets")
@CrossOrigin(origins = "http://localhost:5173")  // Allow frontend from this port
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public @ResponseBody Iterable<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createPet(@RequestBody Pet pet) throws URISyntaxException {
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.created(new URI("/deloria/pets/" + savedPet.getId())).body(savedPet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Integer id, @RequestBody Pet pet) {
        Pet currentPet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No pet found with id: " + id));

        currentPet.setName(pet.getName());
        currentPet.setSpecies(pet.getSpecies());
        currentPet.setBreed(pet.getBreed());
        currentPet.setGender(pet.getGender());
        currentPet.setImage(pet.getImage());
        currentPet.setDescription(pet.getDescription());
        currentPet.setPrice(pet.getPrice());

        petRepository.save(currentPet);
        return ResponseEntity.ok("Pet with id " + id + " updated.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            petRepository.deleteById(id);
            return ResponseEntity.ok("Pet with id " + id + " deleted.");
        } else {
            return ResponseEntity.badRequest().body("No pet found with id: " + id);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPetById(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        return pet.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("empty"));
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<?> searchPet(@PathVariable String key) {
        Iterable<Pet> pets = petRepository.findByNameContainingOrSpeciesContainingOrBreedContainingOrGenderContainingOrDescriptionContaining(
                key, key, key, key, key);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/search/price/{price}")
    public ResponseEntity<?> filterByPrice(@PathVariable Double price) {
        Iterable<Pet> pets = petRepository.findByPriceLessThanEqual(price);
        return ResponseEntity.ok(pets);
    }

    // ✅ Bulk insert endpoint
    @PostMapping("/bulk")
    public ResponseEntity<?> createBulkPets(@RequestBody Iterable<Pet> pets) {
        try {
            if (pets == null || !pets.iterator().hasNext()) {
                return ResponseEntity.badRequest().body("The request body cannot be empty.");
            }
            Iterable<Pet> savedPets = petRepository.saveAll(pets);
            return ResponseEntity.ok(savedPets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while saving pets: " + e.getMessage());
        }
    }
}
