import { LogLevel } from './log-level';
/**
 * Represents a log message emitted at a specific level.
 * Potentially has a source of other log messages.
 */
export interface LogMessage {
  /**
   * Log level for this message
   */
  level: LogLevel;
  /**
   * Log message
   */
  message: string;
  /**
   * Any potential source message for this message
   */
  source?: LogMessage;
  /**
   * Perform the actual logging
   */
  log(): void;
  /**
   * Throws the log message as an error
   */
  throw(): never;
}
/**
 * Default log message outputting to console
 */
export declare class DefaultLogMessage implements LogMessage {
  readonly level: LogLevel;
  readonly message: string;
  readonly source?: Readonly<LogMessage> | undefined;
  private static readonly DEFAULT_INDENT;
  constructor(level: LogLevel, message: string, source?: Readonly<LogMessage> | undefined);
  /**
   * Convert the message, and any sources to a stack string
   */
  toString(): string;
  /**
   * Perform the actual logging, sending the result of toString to console.
   */
  log(): void;
  /**
   * Throws the log message as an error
   */
  throw(): never;
  private getMessageWithStack;
  private getFormattedSourceStack;
  private getSourceMessages;
  private getIndent;
  private getLogMethod;
}
