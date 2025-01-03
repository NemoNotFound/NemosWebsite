package com.nemonotfound.webnotfound.exceptions;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(String idOrSlug) {
        super(String.format("No project with id/slug: '%s' was found", idOrSlug));
    }
}
