import { IssueEntity } from "@modules/Issue/issue.entity";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Pagination } from "@type/index";

@Injectable()
export class SearchService {
  constructor(private esService: ElasticsearchService) {}
  async createIndex() {
    const index = await this.esService.indices.exists({ index: "booji" });
    if (index.statusCode !== 404) return;
    this.esService.indices.create(
      {
        index: "booji",
        body: {
          settings: {
            analysis: {
              analyzer: {
                autocomplete_analyzer: {
                  tokenizer: "autocomplete",
                  filter: ["lowercase"],
                },
                autocomplete_search_analyzer: {
                  tokenizer: "keyword",
                  filter: ["lowercase"],
                },
              },
              tokenizer: {
                autocomplete: {
                  type: "edge_ngram",
                  min_gram: 1,
                  max_gram: 30,
                  token_chars: ["letter", "digit", "whitespace"],
                },
              },
            },
          },
          // mappings: {
          // properties: {
          // timestamp: {
          //   type: "date",
          // },
          // title: {
          //   type: "text",
          //   fields: {
          //     complete: {
          //       type: "text",
          //       analyzer: "autocomplete_analyzer",
          //       search_analyzer: "autocomplete_search_analyzer",
          //     },
          //   },
          // },
          // year: { type: "integer" },
          // genres: { type: "nested" },
          // actors: { type: "nested" },
          // },
          // },
        },
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async search(
    from: number,
    size: number,
    issueId: number
  ): Promise<Pagination<IssueEntity>> {
    let data = [];
    const { body } = await this.esService.search({
      index: "booji",
      body: {
        from,
        size,
        query: {
          match: {
            issueId: issueId,
          },
        },
      },
    });
    const hits = body.hits.hits;
    hits.map((item) => {
      data.push(item._source);
    });

    return { data, count: body.hits.total.value };
  }

  // 获取最近 minute 内某个 event 出现的次数，用于匹配告警规则
  async searchEventCount(issueId: string, minute: number): Promise<number> {
    const gte = Date.now() - minute * 60 * 1000;
    const { body } = await this.esService.count({
      index: "booji",
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  issueId: issueId,
                },
              },
            ],
            filter: {
              range: {
                timestamp: {
                  gte: gte,
                },
              },
            },
          },
        },
      },
    });
    return body.count;
  }

  async save(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.esService.bulk(
        {
          index: "booji",
          body: [{ index: { _index: "booji" } }, data],
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
