import http from "@/lib/http";
import { ModelResListType } from "@/schemas/model.schema";
const modelApiRequest = {
    modelClient: () =>
        http.get<ModelResListType>(`/api/v1/public/model`),
}
export default modelApiRequest;