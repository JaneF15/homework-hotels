import { CreateTextBlockDto } from "./create-text-block.dto";

export class UpdateTextBlockDto extends CreateTextBlockDto{
  readonly title: string;
  readonly id: number;
}