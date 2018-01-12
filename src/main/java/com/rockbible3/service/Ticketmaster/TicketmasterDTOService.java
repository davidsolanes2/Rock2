package com.rockbible3.service.Ticketmaster;

import com.rockbible3.service.dto.Ticketmaster.Ticketmaster;
import org.springframework.stereotype.Service;
import retrofit2.Call;

import java.io.IOException;

@Service
public class TicketmasterDTOService {

    public static final String apiKey = "Ueaj6YT5WnVlSeGNvtzkj7XqvwC99JP6";
    static TicketmasterDTORepository apiService = TicketmasterDTORepository.retrofit.create(TicketmasterDTORepository.class);

    public static Ticketmaster getStageByArtist(){
        Ticketmaster StageByArtist = null;
        Call<Ticketmaster> callStageByArtist = apiService.getStageByArtist("Ed Sheeran", 0,5, "*", apiKey);
        System.out.println(callStageByArtist);
        try {
            StageByArtist = callStageByArtist.execute().body();
            System.out.println(StageByArtist);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return StageByArtist;
    }
}

