import { MovieType } from "@/models";
import { encodeData } from "./utils";

export const handleEncodeParams = (movie : MovieType) => {
    const dataToEncode: { id: string | undefined, title: string | undefined, number_ep?: number } = {
        id: movie.title_id,
        title: movie.title,
      };
    
      if (movie.number_ep) {
        dataToEncode.number_ep = 1;
      }
    
      return encodeData(dataToEncode);
}

