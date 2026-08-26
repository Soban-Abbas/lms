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
}

