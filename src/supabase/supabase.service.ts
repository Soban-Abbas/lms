import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {   ConfigService } from '@nestjs/config';
@Injectable()
export class SupabaseService {
    public client: SupabaseClient;

    constructor(private config: ConfigService) {
        this.client = createClient(
            this.config.get('SUPABASE_URL')!,
            this.config.get('SUPABASE_ANON_KEY')!,
        );
    }




    async uploadFile(bucket: string, filePath: string, file: Buffer, contentType: string) {
        const { data, error } = await this.client.storage
            .from(bucket)
            .upload(filePath, file, { contentType, upsert: true });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = this.client.storage.from(bucket).getPublicUrl(filePath);
        return publicUrlData.publicUrl;
    }




}

