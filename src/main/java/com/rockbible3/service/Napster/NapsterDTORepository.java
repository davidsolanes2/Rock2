package com.rockbible3.service.Napster;

import com.rockbible3.service.dto.Napster.NapsterTracksDTO;
import com.rockbible3.service.dto.Napster.NapsterArtistsDTO;
import retrofit2.Call;
import retrofit2.GsonConverterFactory;
import retrofit2.Retrofit;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface NapsterDTORepository {

    public static String url = "http://api.napster.com/v2.2/";
    public static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(url)
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    @GET("tracks/top")
    Call<NapsterTracksDTO> getTopSong(@Query("limit") int limit
        , @Query("catalog") String catalog
        , @Query("apikey") String apiKey);

    @GET("artists/top")
    Call<NapsterArtistsDTO> getTopArtists (@Query("limit") int limit
        , @Query("catalog") String catalog
        , @Query("apikey") String apiKey);
}
