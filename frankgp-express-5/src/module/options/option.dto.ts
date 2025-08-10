import { PartialType } from "@nestjs/mapped-types";

export class CreateOptionDto {
  key: string;
  value: string;
  type?: string;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
