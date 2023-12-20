import { RequiredLivingSpaceResponse } from "./RequiredLivingSpaceResponse";

export class LivingPlace {
    id = "";
    name = "";
    description = "";
    location = "";
    temperature = 0.0;
    humidity = 0.0;
    livingSpace = 0.0;
    thUpdateDate = Date();
    userId = "";
    requiredLivingSpaceResponse = new RequiredLivingSpaceResponse();
}