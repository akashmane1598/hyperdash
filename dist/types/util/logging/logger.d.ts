import { LogLevel } from './log-level';
import { LogMessage } from './log-message';
/**
 * Logging utility
 */
export declare class Logger {
  private readonly loggerName;
  private static readonly LOG_PRIORITY;
  private static readonly DEFAULT_LOG_MESSAGE_BUILDER;
  private logLevel;
  private logMessageBuilder;
  constructor(loggerName?: string);
  /**
   * Log provided message at info level
   */
  info(message: string, source?: LogMessage | Error): LogMessage;
  /**
   * Log provided message at debug level
   */
  debug(message: string, source?: LogMessage | Error): LogMessage;
  /**
   * Log provided message at error level
   */
  error(message: string, source?: LogMessage | Error): LogMessage;
  /**
   * Log provided message at warn level
   */
  warn(message: string, source?: LogMessage | Error): LogMessage;
  /**
   * Log provided message at requested level
   */
  log(logLevel: LogLevel, message: string, source?: LogMessage | Error): LogMessage;
  /**
   * Set the minimum log level. Any log statements that are at a more verbose level are not logged..
   */
  setLogLevel(level: LogLevel): void;
  /**
   * Provides a log message builder to implement custom logging behavior
   */
  setLogMessageBuilder(builder: LogMessageBuilder): void;
  private shouldLogMessage;
  private convertSourceToLogMessageOrUndefined;
}
export declare type LogMessageBuilder = (level: LogLevel, message: string, source?: LogMessage) => LogMessage;
