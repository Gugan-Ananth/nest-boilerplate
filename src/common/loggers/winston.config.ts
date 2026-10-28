import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const timestamp = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

const messageParser = format.printf(( { timestamp, level, message }) => {
    const parsedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    return `${timestamp} [${level}] - ${parsedMessage}`;
});

const dailyRotateConfig = {
    zippedArchive: true,
    datePattern: 'YYYY-MM-DD',
    maxFiles: `${process.env.MAX_LOG_FILE_DAYS}d`,
    format: format.combine(timestamp, messageParser),
    handleExceptions: true,
}

export const winstonConfig = WinstonModule.createLogger({
    transports: [
        new transports.Console({ format: format.combine(timestamp, format.colorize(), messageParser) }),
        new DailyRotateFile({...dailyRotateConfig, filename: 'logs/info-%DATE%.log'}),
        new DailyRotateFile({...dailyRotateConfig, filename: 'logs/error-%DATE%.log', level: 'error'}),   
    ],
    handleExceptions: true
});