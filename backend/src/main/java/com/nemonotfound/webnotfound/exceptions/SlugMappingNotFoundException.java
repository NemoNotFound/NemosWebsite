package com.nemonotfound.webnotfound.exceptions;

public class SlugMappingNotFoundException extends RuntimeException {

    public SlugMappingNotFoundException(String slug) {
        super(String.format("No id was found for following slug: %s", slug));
    }
}
