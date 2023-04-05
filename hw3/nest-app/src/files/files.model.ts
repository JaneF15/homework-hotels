import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TextBlock } from "src/text-block/text-block.model";

interface FilesCreationAttr {
  fileName: string;
}

@Table({tableName: 'file'})
export class Files extends Model<Files, FilesCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  fileName: string;

  @Column({type: DataType.STRING})
  originalName: string;

  @Column({type: DataType.STRING})
  essenceTable: string;

  @BelongsTo(() => TextBlock)
  textBlock: TextBlock;

  @ForeignKey(() => TextBlock)
  @Column({type: DataType.INTEGER})
  essenceId: number;
  
}