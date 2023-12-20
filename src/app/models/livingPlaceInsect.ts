import { RequiredFoddersExistenceResponse } from "./RequiredFoddersExistenceResponse";
import { RequiredHumidityResponse } from "./RequiredHumidityResponse";
import { RequiredTemperatureResponse } from "./RequiredTemperatureResponse";
import { TimeOfResidenceResponse } from "./TimeOfResidenceResponse";

export class LivingPlaceInsect {
    insectId = "";
    livingPlaseId = "";
    insectCount = 0;
    settlementDate = Date();
    insectName = "";
    requiredTemperatureResponse = new RequiredTemperatureResponse();
    requiredHumidityResponse = new RequiredHumidityResponse();
    requiredFoddersExistenceResponse = new RequiredFoddersExistenceResponse();
    timeOfResidenceResponse = new TimeOfResidenceResponse();
}