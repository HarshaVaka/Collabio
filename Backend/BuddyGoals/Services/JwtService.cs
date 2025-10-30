using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Services.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BuddyGoals.Services
{
    public class JwtService(IConfiguration configuration) : IJwtService
    {
        private readonly IConfiguration _configuration = configuration;

        public string GenerateAccessToken(GenerateAccessTokenDto? generateTokenDto)
        {
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier,generateTokenDto?.UserId.ToString()??""),
                new(ClaimTypes.Name,generateTokenDto?.UserName??""),
                new(ClaimTypes.Email,generateTokenDto?.Email ?? ""),
                new(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var role in generateTokenDto?.Roles ?? [])
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "")
               );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: authClaims,
                expires: DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])
                ),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        public RefreshToken GenerateRefreshToken(string ipAddress)
        {
            var randomNumber = new byte[32];
            using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiresAt = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDays"] ?? "7")),
                CreatedAt = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }
    }
}
