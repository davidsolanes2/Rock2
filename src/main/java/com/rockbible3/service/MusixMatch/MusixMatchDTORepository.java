package com.rockbible3.service.MusixMatch;


import com.rockbible3.service.dto.MusixMatch.MusixMatch;
import org.springframework.stereotype.Repository;
import retrofit2.Call;
import retrofit2.GsonConverterFactory;
import retrofit2.Retrofit;
import retrofit2.http.GET;
import retrofit2.http.Query;

import java.util.Map;

@Repository
public interface MusixMatchDTORepository {


    public static String url = "http://api.musixmatch.com/ws/1.1/";
    public static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(url)
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    @GET("chart.tracks.get")
    Call<MusixMatch>  getTopSongs(@Query("page") int page
        , @retrofit2.http.Query("page_size") int page_size
        , @Query("country") String country
        , @Query("f_has_lyrics") int f_has_lyrics
        , @Query("apikey") String apiKey);

    @GET("track.search")
    Call<MusixMatch> getTrack(@Query("page") int page
        , @retrofit2.http.Query("q_artist") String q_artist
        , @Query("page_size") int page_size
        , @Query("s_track_rating") String s_track_rating
        , @Query("apikey") String apiKey);

    @GET("artist.search")
    Call<MusixMatch> getArtist(@Query("page") int page
        , @retrofit2.http.Query("q_artist") String q_artist
        , @Query("page_size") int page_size
        , @Query("apikey") String apiKey);

}
