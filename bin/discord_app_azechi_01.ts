#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DiscordAppAzechi01Stack } from '../lib/discord_app_azechi_01-stack';

const app = new cdk.App();
new DiscordAppAzechi01Stack(app, 'DiscordAppAzechi01Stack');
