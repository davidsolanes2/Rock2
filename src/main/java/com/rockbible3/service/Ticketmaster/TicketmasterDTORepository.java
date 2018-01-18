package com.rockbible3.service.Ticketmaster;

import com.rockbible3.service.dto.Ticketmaster.Ticketmaster;
import retrofit2.Call;
import retrofit2.GsonConverterFactory;
import retrofit2.Retrofit;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface TicketmasterDTORepository {

    @GET("events")
    Call<Ticketmaster> getStageByArtist(@Query("keyword") String keyword
        , @retrofit2.http.Query("page") int page
        , @Query("size") int size
        , @Query("locale") String locale
        , @Query("apikey") String apiKey);


    public static String url = "http://app.ticketmaster.com/discovery/v2/";
    public static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(url)
        .addConverterFactory(GsonConverterFactory.create())
        .build();

}
