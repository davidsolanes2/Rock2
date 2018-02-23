package com.rockbible3.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Repository;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;
    private JHipsterProperties jHipsterProperties;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        this.jHipsterProperties = jHipsterProperties;
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Country.class.getName() + ".bands", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Country.class.getName() + ".artists", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Genre.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Genre.class.getName() + ".bands", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Album.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Album.class.getName() + ".songs", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Album.class.getName() + ".valoracions", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Album.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Song.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Song.class.getName() + ".valoracions", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Artist.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Artist.class.getName() + ".instruments", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Artist.class.getName() + ".valoracions", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Band.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Band.class.getName() + ".genres", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Band.class.getName() + ".albums", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Band.class.getName() + ".artists", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Band.class.getName() + ".valoracions", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Social.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Instrument.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Instrument.class.getName() + ".artists", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Label.class.getName() + ".bands", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Label.class.getName() + ".artists", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.UserExt.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.UserExt.class.getName() + ".albums", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.ValoracionAlbum.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.ValoracionSong.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.ValoracionArtist.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.ValoracionBand.class.getName(), jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Genre.class.getName() + ".songs", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Song.class.getName() + ".genres", jcacheConfiguration);
            cm.createCache(com.rockbible3.domain.Collections.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
