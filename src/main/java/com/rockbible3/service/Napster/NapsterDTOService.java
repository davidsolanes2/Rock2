package com.rockbible3.service.Napster;

import com.rockbible3.service.dto.Napster.NapsterTracksDTO;
import com.rockbible3.service.dto.Napster.NapsterArtistsDTO;
import retrofit2.Call;

import java.io.IOException;

public class NapsterDTOService {

    public static final String apiKey = "MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll";
    static NapsterDTORepository apiService = NapsterDTORepository.retrofit.create(NapsterDTORepository.class);


    public static NapsterTracksDTO getTopSongNap(){
        NapsterTracksDTO topSongs = null;
        Call<NapsterTracksDTO> callTopSongs = apiService.getTopSong(10,"ES",apiKey);
        System.out.println(callTopSongs);
        try {
            topSongs = callTopSongs.execute().body();
            System.out.println(topSongs);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return topSongs;
    }

    public static NapsterArtistsDTO getTopArtistsNap(){
        NapsterArtistsDTO topArtists = null;
        Call<NapsterArtistsDTO> callTopArtists = apiService.getTopArtists(10,"ES",apiKey);
        System.out.println(callTopArtists);
        try {
            topArtists = callTopArtists.execute().body();
            System.out.println(topArtists);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return topArtists;
    }
}
