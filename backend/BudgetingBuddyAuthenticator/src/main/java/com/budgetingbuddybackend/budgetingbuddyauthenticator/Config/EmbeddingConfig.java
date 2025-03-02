package com.budgetingbuddybackend.budgetingbuddyauthenticator.Config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiEmbeddingClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmbeddingConfig {

    @Value("${spring.ai.openai.api-key}")
    private String openaiApiKey;

    @Bean
    public EmbeddingModel embeddingModel() {
        return new OpenAiEmbeddingClient(openaiApiKey);
    }
}
