import { ProjectEntity } from "@modules/Project/project.entity";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { NotifyRule } from "@type/index";
import { createTransport, Transporter } from "nodemailer";
import { Repository } from "typeorm";
import { Severity } from "@type/Issue";
import { SearchService } from "@modules/Search/search.service";

@Injectable()
export class NotifyService {
  transporter: Transporter;

  constructor(
    private configService: ConfigService,
    private esService: SearchService,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
  ) {}

  init() {
    const { user, pass } = this.configService.get("email");
    this.transporter = createTransport({
      host: "smtp.qq.com",
      auth: {
        user,
        pass,
      },
    });
  }

  async notify(event) {
    const project = await this.projectRepository.findOne({
      where: {
        appKey: event.appKey,
      },
      relations: ["users"],
    });
    const rule = {
      minute: project.ruleMinute,
      count: project.ruleCount,
    };
    const yes = await this.shouldNotify(event, rule);
    console.log(yes);

    if (!yes) return;

    const to = project.users.map((user) => user.email);

    if (!to.length) return;

    this.transporter.sendMail(
      {
        from: "BoojiNotify <xietian.whut@qq.com>",
        to,
        subject: `[${project.name}] ${event.message}`,
        html: `
          <p>项目名：${project.name}</p>
          <p>appKey：${event.appKey}</p>
          <p>message：${event.message}</p>
          <p>等级：${event.level}</p>
          <p>类型：${event.type}</p>
          <p>分类：${event.category}</p>
        `,
      }
      // (err, info) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(info);
      //   }
      // }
    );
  }

  async shouldNotify(
    { level, issueId },
    { minute, count }: NotifyRule
  ): Promise<boolean> {
    // 非错误
    if (
      level === Severity.Warn ||
      level === Severity.Info ||
      level === Severity.Log
    )
      return false;
    // 紧急错误
    if (level === Severity.Critical) return true;
    // 常规错误（根据告警规则通知）
    const existedCount = await this.esService.searchEventCount(issueId, minute);
    return existedCount + 1 >= count;
  }
}
