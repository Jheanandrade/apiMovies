import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<TData> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Your request is being processed', required: false })
  message: string;

  @ApiProperty({ required: false })
  data: TData;
}
