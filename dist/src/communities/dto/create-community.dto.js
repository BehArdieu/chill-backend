"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommunityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCommunityDto {
}
exports.CreateCommunityDto = CreateCommunityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Artistes Parisiens', description: 'Nom de la communauté' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Communauté d\'artistes et d\'amateurs d\'art à Paris',
        description: 'Description de la communauté',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Art', description: 'Catégorie de la communauté' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/avatar.jpg',
        description: 'URL de l\'avatar',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "avatar_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/cover.jpg',
        description: 'URL de la couverture',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommunityDto.prototype, "cover_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Communauté publique',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCommunityDto.prototype, "is_public", void 0);
//# sourceMappingURL=create-community.dto.js.map