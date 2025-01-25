import { ApiExtension, ApiExtraModels, ApiProperty } from '../../../../lib';
import { ExtraModelDto } from './extra-model.dto';
import { LettersEnum } from './pagination-query.dto';
import { TagDto } from './tag.dto';

@ApiExtraModels(ExtraModelDto)
@ApiExtension('x-tags', ['foo', 'bar'])
export class CreateCatDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty({ minimum: 1, maximum: 200 })
  readonly age: number;

  @ApiProperty({ name: '_breed', type: String })
  readonly breed: string;

  @ApiProperty({
    format: 'uri',
    type: [String]
  })
  readonly tags?: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    isArray: true
  })
  readonly urls?: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        isReadonly: {
          type: 'string'
        }
      }
    }
  })
  readonly options?: Record<string, any>[];

  @ApiProperty({
    description: 'Enum with description'
  })
  readonly enumWithDescription: LettersEnum;

  @ApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum'
  })
  readonly enum: LettersEnum;

  @ApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum',
    isArray: true,
    description: 'This is a description for the enumArr attribute'
  })
  readonly enumArr: LettersEnum[];

  @ApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum',
    description: 'A small assortment of letters (in DTO)?',
    default: 'A',
    deprecated: true,
    enumSchema: {
      description: 'This is a description for the LettersEnum schema',
      deprecated: true
    }
  })
  readonly enumWithRef: LettersEnum;

  @ApiProperty({ description: 'tag', required: false })
  readonly tag: TagDto;

  nested: {
    first: string;
    second: number;
  };
}
