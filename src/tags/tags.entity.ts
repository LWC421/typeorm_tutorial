import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BlogEntity } from 'src/blogs/blogs.entity';

@Entity({
  name: 'TAG',
})
export class TagEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(() => BlogEntity, (blog: BlogEntity) => blog.tags)
  //여기서는 JoinTable을 안만들었는데 BlogEntity에서 지정했기 때문에
  blogs: BlogEntity[];
}
