import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

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
          mappings: {
            properties: {
              title: {
                type: "text",
                fields: {
                  complete: {
                    type: "text",
                    analyzer: "autocomplete_analyzer",
                    search_analyzer: "autocomplete_search_analyzer",
                  },
                },
              },
              year: { type: "integer" },
              genres: { type: "nested" },
              actors: { type: "nested" },
            },
          },
        },
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async search(from: number, size: number, issueId: number) {
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
