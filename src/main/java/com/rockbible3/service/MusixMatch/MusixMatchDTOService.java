package com.rockbible3.service.MusixMatch;


import com.rockbible3.service.dto.MusixMatch.MusixMatch;
import org.springframework.stereotype.Service;
import retrofit2.Call;

import java.io.IOException;



@Service
public class MusixMatchDTOService {
    public static final String apiKey = "834e902d53b2e87b494431d7fda16e8f";
    static MusixMatchDTORepository apiService = MusixMatchDTORepository.retrofit.create(MusixMatchDTORepository.class);

    public static MusixMatch getTopSongs(){
        MusixMatch topSongs = null;
        Call<MusixMatch> callTopSongs = apiService.getTopSongs(1, 5, "es", 1,  apiKey);
        System.out.println(callTopSongs);
        try {
            topSongs = callTopSongs.execute().body();
            System.out.println(topSongs);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return topSongs;
    }

}
