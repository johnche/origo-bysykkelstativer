import pino, { type Logger } from 'pino';

const prodConfig = { level: 'warn' };

const devConfig = {
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
	level: 'debug',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export const logger: Logger = pino(config);
