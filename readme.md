# State data API

## Overview

This API was created as a final project for INF653 at Fort Hays State University.

## Tech stack
- NodeJS
- Express
- Mongoose
- MongoDB

## Endpoints

| **Method(s)**            | **Request**               | **Response**                                        |
|--------------------------|---------------------------|-----------------------------------------------------|
| GET                      | /states/                  | All state data returned                             |
| GET                      | /states/?contig=true      | All state data for contiguous states (Not AK or HI) |
| GET                      | /states/?contig=false     | All state data for non-contiguous states (AK, HI)   |
| GET                      | /states/:state            | All data for the given state                        |
| GET, POST, PATCH, DELETE | /states/:state/funfact    | A random fun fact for the state URL parameter       |
| GET                      | /states/:state/capital    | { ‘state’: stateName, ‘capital’: capitalName }     |
| GET                      | /states/:state/nickname   | { ‘state’: stateName, ‘nickname’: nickname }       |
| GET                      | /states/:state/population | { ‘state’: stateName, ‘population’: population }    |
| GET                      | /states/:state/admission  | { ‘state’: stateName, ‘admitted’: admissionDate }   |

<br /><br />

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/19634945-3b23ec7a-d7cc-4af7-b5a4-c9be60c1ac9e?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D19634945-3b23ec7a-d7cc-4af7-b5a4-c9be60c1ac9e%26entityType%3Dcollection%26workspaceId%3D98aa16ba-1e8d-4866-85a0-dc77dd27869c)