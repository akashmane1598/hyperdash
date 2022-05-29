import { ParseNode } from './parse-node';
/**
 * Represents a parsed expression which can detect and replace variables.
 * Parsing is done lazily.
 * TODO: revisit this...
 */
export declare class ExpressionParser {
  private readonly expression;
  private static readonly ESCAPE;
  private static readonly START;
  private static readonly OPEN;
  private static readonly CLOSE;
  private static readonly EXPRESSION_OPEN_LENGTH;
  private static readonly EXPRESSION_CLOSE_LENGTH;
  private readonly rootRule;
  private readonly parseRules;
  private parsed?;
  constructor(expression: string);
  /**
   * Transform source string into parse tree
   */
  parse(): ParseNode;
  private isEscapeSequence;
  private isExpressionOpen;
  private isExpressionClose;
  private lengthBetween;
  private lastIndexOfLength;
  private parseByRule;
}
